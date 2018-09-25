<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function modify(Product $product) {
        return [
            'id' => (int) $product->getId(),
            'product' =>  (string) $product->getProduct(),
            'description' => (string) $product->getDescription(),
            'likeCount' =>  (int) $product->getLikeCount(),
            'price' =>  (string) $product->getPrice(),
            'image' => (string) $product->getImageUrl()
        ];
    }

    public function modifyAllProduct()
    {
        $products  = $this->findAll();
        $productsArray = [];
        foreach ($products as $product) {
            $productsArray [] = $this->modify($product);
        }

        return $productsArray;
    }
}
