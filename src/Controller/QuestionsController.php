<?php

namespace App\Controller;

use App\Services\DatabaseService;
use App\Services\DownloadMediaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class QuestionsController extends AbstractController
{

    private DownloadMediaService $downloadMediaService;
    private DatabaseService $databaseService;

    public function __construct(
        DownloadMediaService $downloadMediaService,
        DatabaseService $databaseService
    )
    {

        $this->downloadMediaService = $downloadMediaService;
        $this->databaseService = $databaseService;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $responseToReturn = [
            "message" => "",
            "status" => ""
        ];

        try {
            $data = $request->getContent();
            $userData = json_decode($data, true);
            $title = $userData["title"];
            $answers = $userData["answers"];
            $defaultAnswer = $userData["defaultAnswer"];
            $videoUrl = $userData["videoUrl"];

        } catch(\Exception $exception) {
            $responseToReturn["message"] = "Une erreur est survenue lors du traitement des données de l'utilisateur.";
            $responseToReturn["status"] = 401;
            $responseToReturn["exception"] = $exception;
            $responseToReturn["field_required"] = [
                'title',
                'answers',
                'defaultAnswer',
                'videoUrl'
            ];
        }
        $moeApiResponse = $this->downloadMediaService->fetchMoeApi($request);
        $commitUserDataToDB = $this->databaseService->commitQuestionDataToDB([
            'title' => $title,
            'answers' => $answers,
            'defaultAnswer' => $defaultAnswer,
            'videoUrl' => $moeApiResponse["path"]
        ]);

        if ($commitUserDataToDB) {
            $responseToReturn["message"] = $moeApiResponse["message"];
            $responseToReturn["path"] = $moeApiResponse["path"];
            $responseToReturn["status"] = $moeApiResponse["status"];
        }

        return new JsonResponse($responseToReturn, $responseToReturn["status"]);
    }
}
