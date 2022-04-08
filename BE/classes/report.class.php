<?php
require_once __DIR__ . '/json.class.php';
class Report extends JSON
{
    private function error(string $message)
    {
        return array(
            'error' => true,
            'message' => $message
        );
    }

    private function getReportById(int $id)
    {
        if (isset($this->getCurrentData()[$id])) {
            return json_encode($this->getCurrentData()[$id]);
        }
        return $this->error('item not found');
    }

    private function getReport(int $start, int $length): iterable
    {
        $temp = $this->getCurrentData();
        // return array_slice($temp, $start, $length);
        return $temp;
    }

    private function reportGenerator(int $start, int $length): iterable
    {
        $temp = $this->getReport($start, $length);
        return array(
            'totalValues' => count($this->getCurrentData()),
            'totalPages' => ceil((count($temp) / $length)),
            'rows' => $temp,
            'error' => false
        );
    }

    private function convertReportToJSON(int $start, int $length)
    {
        $report = $this->reportGenerator($start, $length);
        return json_encode($report);
    }

    private function recordNewData($data): string
    {
        $temp = json_decode($data, true);
        $this->appendDataToArray($temp);
        $response =  array(
            'error' => $this->appendDataToFile(),
            'message' => ''
        );
        return json_encode($response);
    }

    public function __construct()
    {
        parent::__construct();
        $this->readData();
    }

    public function run(): void
    {
        if (isset($_GET['report']) && !empty($_GET['report'])) {
            if ((isset($_GET['start']) && !empty($_GET['start'])) && (isset($_GET['length']) && !empty($_GET['length']))) {
                echo $this->convertReportToJSON($_GET['start'], $_GET['length']);
            } else {
                echo $this->error('incorrect query');
            }
        } else if (isset($_POST['record']) && !empty($_POST['record'])) {
            echo $this->recordNewData($_POST['record']);
        } else if (isset($_GET['pageId']) && !empty($_GET['pageId'])) {
            echo $this->getReportById($_GET['pageId']);
        } else {
            echo $this->error('no request is present');
        }
    }
}
