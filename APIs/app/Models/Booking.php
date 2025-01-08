<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_at',
        'start_date',
        'end_date',
        'cabin_id',
        'guest_id',
        'has_breakfast',
        'observations',
        'is_paid',
        'num_guests',
        'num_nights',
        'cabin_price',
        'extras_price',
        'total_price',
        'status'
    ];


    public static function validationRules()
    {
        return [
            'start_date' =>'date',
            'end_date' => 'date',
            'num_guests' => 'integer',
            'num_nights' => 'integer',
            'is_paid' => 'boolean',
            'has_breakfast' => "boolean", 
            'cabin_id' => "integer", 
            'guest_id' => "integer", 
        ];
    }


    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    public function cabin()
    {
        return $this->belongsTo(Cabin::class);
    }
}
