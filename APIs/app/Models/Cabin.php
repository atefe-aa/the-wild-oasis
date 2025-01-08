<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabin extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'max_capacity',
        'regular_price',
        'discount',
        'image',
        'status'
    ];

    public static function validationRules()
    {
        return [
            'name' =>'required|string',
            'regular_price' => 'required',
            'max_capacity' => 'required',
            'description' => 'string',
            'image' => ['required','image','mimes:jpeg,png,jpg,gif'], 
        ];
    }

}
