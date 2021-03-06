<?php
xapp_import('xapp.VFS.Archive.new.ExtractableInterface');
/**
 * Tar format adapter for the Archive package
 *
 * This class is inspired from and draws heavily in code and concept from the Compress package of
 * The Horde Project <http://www.horde.org>
 *
 * @contributor  Michael Slusarz <slusarz@horde.org>
 * @contributor  Michael Cochrane <mike@graftonhall.co.nz>
 *
 * @since  1.0
 */
class xapp_Tar implements xapp_ExtractableInterface
{
	/**
	 * Tar file types.
	 *
	 * @var    array
	 * @since  1.0
	 */
	private $types = array(
		0x0 => 'Unix file',
		0x30 => 'File',
		0x31 => 'Link',
		0x32 => 'Symbolic link',
		0x33 => 'Character special file',
		0x34 => 'Block special file',
		0x35 => 'Directory',
		0x36 => 'FIFO special file',
		0x37 => 'Contiguous file');

	/**
	 * Tar file data buffer
	 *
	 * @var    string
	 * @since  1.0
	 */
	private $data = null;

	/**
	 * Tar file metadata array
	 *
	 * @var    array
	 * @since  1.0
	 */
	private $metadata = null;

	/**
	 * Holds the options array.
	 *
	 * @var    mixed  Array or object that implements \ArrayAccess
	 * @since  1.0
	 */
	protected $options = array();

	/**
	 * Create a new Archive object.
	 *
	 * @param   mixed  $options  An array of options or an object that implements \ArrayAccess
	 *
	 * @since   1.0
	 */
	public function __construct($options = array())
	{
		$this->options = $options;
	}

	/**
	 * Extract a ZIP compressed file to a given path
	 *
	 * @param   string  $archive      Path to ZIP archive to extract
	 * @param   string  $destination  Path to extract archive into
	 *
	 * @return  boolean True if successful

	 * @throws  Exception
	 */
	public function extract($archive, $destination)
	{

		$this->data = null;
		$this->metadata = null;

		$this->data = file_get_contents($archive);

		if (!$this->data)
		{
			throw new Exception('Unable to read archive');
		}

		$this->getTarInfo($this->data);

		for ($i = 0, $n = count($this->metadata); $i < $n; $i++)
		{

			$type = strtolower($this->metadata[$i]['type']);

			if ($type == 'file' || $type == 'unix file')
			{
				$buffer = $this->metadata[$i]['data'];
				$path =xapp_Path2::clean($destination . '/' . $this->metadata[$i]['name']);

				// Make sure the destination folder exists
				if (!xapp_Folder2::create(dirname($path)))
				{
					throw new Exception('Unable to create destination');
				}

				if (xapp_File2::write($path, $buffer) === false)
				{
					throw new Exception('Unable to write entry');
				}
			}
		}

		return true;
	}

	/**
	 * Tests whether this adapter can unpack files on this computer.
	 *
	 * @return  boolean  True if supported
	 *
	 * @since   1.0
	 */
	public static function isSupported()
	{
		return true;
	}

	/**
	 * Get the list of files/data from a Tar archive buffer.
	 *
	 * @param   string  &$data  The Tar archive buffer.
	 *
	 * @return  array  Archive metadata array
	 * <pre>
	 * KEY: Position in the array
	 * VALUES: 'attr'  --  File attributes
	 * 'data'  --  Raw file contents
	 * 'date'  --  File modification time
	 * 'name'  --  Filename
	 * 'size'  --  Original file size
	 * 'type'  --  File type
	 * </pre>
	 *
	 * @since   1.0
	 * @throws  Exception
	 */
	protected function getTarInfo(&$data)
	{
		$position = 0;
		$return_array = array();

		while ($position < strlen($data))
		{
			if (version_compare(PHP_VERSION, '5.5', '>='))
			{
				$info = @unpack(
					"Z100filename/Z8mode/Z8uid/Z8gid/Z12size/Z12mtime/Z8checksum/Ctypeflag/Z100link/Z6magic/Z2version/Z32uname/Z32gname/Z8devmajor/Z8devminor",
					substr($data, $position)
				);
			}
			else
			{
				$info = @unpack(
					"a100filename/a8mode/a8uid/a8gid/a12size/a12mtime/a8checksum/Ctypeflag/a100link/a6magic/a2version/a32uname/a32gname/a8devmajor/a8devminor",
					substr($data, $position)
				);
			}

			if (!$info)
			{
				throw new Exception('Unable to decompress data');
			}

			$position += 512;
			$contents = substr($data, $position, octdec($info['size']));
			$position += ceil(octdec($info['size']) / 512) * 512;

			if ($info['filename'])
			{
				$file = array(
					'attr' => null,
					'data' => null,
					'date' => octdec($info['mtime']),
					'name' => trim($info['filename']),
					'size' => octdec($info['size']),
					'type' => isset($this->types[$info['typeflag']]) ? $this->types[$info['typeflag']] : null);

				if (($info['typeflag'] == 0) || ($info['typeflag'] == 0x30) || ($info['typeflag'] == 0x35))
				{
					/* File or folder. */
					$file['data'] = $contents;

					$mode = hexdec(substr($info['mode'], 4, 3));
					$file['attr'] = (($info['typeflag'] == 0x35) ? 'd' : '-') . (($mode & 0x400) ? 'r' : '-') . (($mode & 0x200) ? 'w' : '-') .
						(($mode & 0x100) ? 'x' : '-') . (($mode & 0x040) ? 'r' : '-') . (($mode & 0x020) ? 'w' : '-') . (($mode & 0x010) ? 'x' : '-') .
						(($mode & 0x004) ? 'r' : '-') . (($mode & 0x002) ? 'w' : '-') . (($mode & 0x001) ? 'x' : '-');
				}
				else
				{
					/* Some other type. */
				}

				$return_array[] = $file;
			}
		}

		$this->metadata = $return_array;

		return true;
	}
}
