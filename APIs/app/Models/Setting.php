<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'min_booking',
        'max_booking',
        'max_guests_per_booking',
        'breafast_price',
    ];

    public static function validationRules()
    {
        return [
            'min_booking'=> 'integer',
            'max_booking'=> 'integer',
            'max_guests_per_booking'=> 'integer',
            'breafast_price'=> 'decimal:2',
        ];
    }

}
