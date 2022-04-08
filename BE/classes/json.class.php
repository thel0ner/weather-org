<?php
require_once __DIR__ . '/config.php';

class JSON extends Config
{
    private $currentData = array();
    private string $path = '';
    protected function readData()
    {
        if (file_exists($this->path)) {
            $file_data = file_get_contents($this->path);
            $this->currentData = json_decode($file_data,true);
        }
    }

    protected function appendDataToArray(array $data): void
    {
        $this->currentData = array_merge(
            $this->currentData ? $this->currentData : [],
            [$data]
        );
    }

    protected function appendDataToFile(): bool
    {
        try {
            $handler = fopen($this->path, 'w');
            fwrite($handler, json_encode($this->currentData));
            fclose($handler);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    protected function getCurrentData()
    {
        return $this->currentData;
    }

    public function __construct()
    {
        $this->path = $this->storage_directory . $this->file_name;
    }
}
