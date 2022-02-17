<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\QuestionController;
use App\Repository\QuestionsRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\QuestionsController;

#[ORM\Entity(repositoryClass: QuestionsRepository::class)]
#[ApiResource(collectionOperations: [
    'get',
    'get_some_question' => [
        'method' => 'POST',
        'path' => '/some/questions',
        'controller' => QuestionController::class
    ],
    'post' => [
        'method' => 'POST',
        'path' => '/questions',
        'controller' => QuestionsController::class
    ],
])]
class Questions
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', length: 500)]
    private ?string $title;

    #[ORM\Column(type: 'array')]
    private array $answers = [];

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $defaultAnswer;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $videoUrl;

    public function __construct(
        string $title,
        array $answers,
        string $defaultAnswer,
        string $videoUrl
    )
    {
        $this->setTitle($title);
        $this->setAnswers($answers);
        $this->setDefaultAnswer($defaultAnswer);
        $this->setVideoUrl($videoUrl);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getAnswers(): ?array
    {
        return $this->answers;
    }

    public function setAnswers(array $answers): self
    {
        $this->answers = $answers;

        return $this;
    }

    public function getDefaultAnswer(): ?string
    {
        return $this->defaultAnswer;
    }

    public function setDefaultAnswer(string $defaultAnswer): self
    {
        $this->defaultAnswer = $defaultAnswer;

        return $this;
    }

    public function getVideoUrl(): ?string
    {
        return $this->videoUrl;
    }

    public function setVideoUrl(string $videoUrl): self
    {
        $this->videoUrl = $videoUrl;

        return $this;
    }
}
