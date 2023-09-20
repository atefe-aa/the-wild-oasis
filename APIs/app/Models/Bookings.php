<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookings extends Model
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
            'start_date' =>'required|date',
            'end_date' => 'required|date',
            'num_guests' => 'required|integer',
            'num_nights' => 'integer',
            'is_paid' => 'boolean',
            'has_breakfast' => "boolean", 
            'cabin_id' => "integer", 
            'guest_id' => "integer", 
        ];
    }


    public function guest()
    {
        return $this->belongsTo(Guests::class);
    }

    public function cabin()
    {
        return $this->belongsTo(Cabins::class);
    }
}
