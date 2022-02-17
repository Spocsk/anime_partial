<?php

namespace App\Services;

use App\Entity\Questions;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class DatabaseService
{

    private ObjectManager $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry)
    {
        $this->managerRegistry = $managerRegistry->getManager();
    }

    public function commitQuestionDataToDB(array $data): bool
    {
        $sucessMessage = [
            "messsage" => "La question à bien été sauvegarder sur le serveur 👍",
            "status" => 201
        ];
        $entityManager = $this->managerRegistry;

        $question = new Questions(
            $data["title"],
            $data["answers"],
            $data["defaultAnswer"],
            $data["videoUrl"]
        );

        try {
            $entityManager->persist($question);
            $entityManager->flush();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
