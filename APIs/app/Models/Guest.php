<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'nationality',
        'national_id',
        'country_flag',
        'avatar',
    ];

    public static function validationRules()
    {
        return [
            'full_name' =>'required|string',
            'email' => 'required',
            'nationality' => 'required',
            'national_id' => 'string',
            'country_flag' => 'string',
            // 'avatar' => ['image','mimes:jpeg,png,jpg,gif'], 
        ];
    }
}
