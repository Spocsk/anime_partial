<?php

namespace App\Services;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class DownloadMediaService
{

    private HttpClientInterface $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function fetchMoeApi(Request $request)
    {
        $errorData = [
            "error" => "La clé 'videoUrl' est requis",
            "status" => 401
        ];
        $data = json_decode($request->getContent(), true);
        try {
            $response = $this->client->request(
                'GET',
                'https://api.trace.moe/search?url=' . $data["videoUrl"]
            );
            $content = $response->getContent();
            $content = $response->toArray();

            return $this->downloadVideoFromUrl($content["result"][1]["video"]);

        } catch (\Exception $e) {
            $errorData["exception"] = $e;
            return $errorData;
        }
    }

    public function downloadVideoFromUrl($url): array
    {
        $filename = uniqid();
        $save_file_loc = $filename . '.mp4';
        try
        {
            file_put_contents("media/" . $save_file_loc, file_get_contents($url));
            return [
                'message' => 'Fichier téléchargé et disponible sur le serveur 👍',
                'path' => '/media/'.$save_file_loc,
                'status' => 201
            ];
        }
        catch(\Exception $exception) {
            return [
                "error" => 'L\'enregistrement de la vidéo sur le serveur n\'a pas aboutis 😭',
                "status" => 401
            ];
        }
    }
}
