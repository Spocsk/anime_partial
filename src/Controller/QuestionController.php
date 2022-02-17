<?php

namespace App\Controller;

use App\Repository\QuestionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class QuestionController extends AbstractController
{
    public function __invoke(QuestionsRepository $questionsRepository, Request $request, NormalizerInterface $normalizer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        try {
            $rows = $data['rows'];
            $questionsNormalized = $normalizer->normalize($questionsRepository->findSomeQuestions(10), 'array');
            return new JsonResponse($questionsNormalized);
        } catch(\Exception $exception) {
            return new JsonResponse(['message' => "La clé 'rows' est requis"], 401);
        } catch (ExceptionInterface $e) {
            return new JsonResponse(['message' => 'impossible de normaliser les questions'], 404);
        }
    }
}
