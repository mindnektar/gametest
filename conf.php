<?php
function __autoload($className) {
    require_once 'class/' . str_replace('_', '/', $className) . '.php';
}

header('Content-Type: text/html; charset=utf-8');
