<!doctype HTML>
<html>
<head>
	<meta charset="utf-8">
	<title>Knockout prezentace</title>
	<link rel="stylesheet" href="slidy/style.css">
	<link rel="stylesheet" href="slidy/highlight.css">
	<script src="slidy/jquery.js"></script>
	<script src="slidy/knockout.js"></script>
	<script type="text/javascript" src="slidy/rainbow.js"></script>
	<script src="slidy/slidy.js"></script>
</head>
<body>
<?php
require __DIR__ . '/slidy/texy.min.php';
$texy = new Texy();
$texy->tabWidth = 4;
$texy->headingModule->balancing = 'fixed';
$texy->imageModule->root = '';
$texy->imageModule->fileRoot = __DIR__;
$html = $texy->process(file_get_contents('knockout.texy'));
$html = str_replace('<h1', '</div><div class="slide"><h1', $html);
echo "<div>$html</div>";
?>
</body>
</html>