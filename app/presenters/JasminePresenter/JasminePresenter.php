<?php

use Nette\Application\ForbiddenRequestException;

/**
 * @author Jan Marek
 */
class JasminePresenter extends BasePresenter
{

	public function startup()
	{
		parent::startup();
		if (!$this->context->parameters['debugMode']) {
			throw new ForbiddenRequestException('Jasmine is available in debug mode only.');
		}
	}

	public function createComponentJasmineCss()
	{
		return new \WebLoader\Nette\CssLoader(
			$this->context->webloader->cssJasmineCompiler,
			$this->template->basePath . '/webtemp'
		);
	}

	public function createComponentJasmineJs()
	{
		return new \WebLoader\Nette\JavaScriptLoader(
			$this->context->webloader->jsJasmineCompiler,
			$this->template->basePath . '/webtemp'
		);
	}

}