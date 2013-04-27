<?php

use Nette\Application\Responses\JsonResponse;
use Nette\NotImplementedException;

class HomepagePresenter extends BasePresenter
{

	private $data = [
		['text' => 'Nakoupit pivo', 'done' => TRUE],
		['text' => 'Uklidit', 'done' => FALSE],
	];

	public function renderDefault()
	{
		$this->template->todos = $this->data;
	}

	public function renderReload()
	{
		// throw new NotImplementedException();

		sleep(1);

		$json = [
			'items' => $this->data,
		];

		$this->sendResponse(new JsonResponse($json));
	}

}
