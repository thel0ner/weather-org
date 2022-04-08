<?php
require_once __DIR__ . '/classes/report.class.php';
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
$report = new Report();
$report->run();
