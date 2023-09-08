<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabins extends Model
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

}
