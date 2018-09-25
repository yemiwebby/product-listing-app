<?php
/**
 * Created by PhpStorm.
 * User: webby
 * Date: 25/09/2018
 * Time: 7:37 AM
 */

namespace App\Service;


use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageUploader
{
    public function uploadImageToCloudinary(UploadedFile $file)
    {
        $fileName = $file->getRealPath();

        \Cloudinary::config([
            "cloud_name" => getenv('CLOUD_NAME'),
            'api_key' => getenv('API_KEY'),
            "api_secret" =>  getenv('API_SECRET')
        ]);

        $imageUploaded = \Cloudinary\Uploader::upload($fileName, [
            'folder' => 'symfony-listing',
            'width' => 200,
            'height' => 200
        ]);

        return $imageUploaded['secure_url'];
    }

}