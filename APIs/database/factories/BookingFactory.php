<?php

namespace Database\Factories;

use App\Models\Cabin;
use App\Models\Guest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Collection;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BookingFactory extends Factory
{
    protected $cabins;
protected $guests;
    public function __construct($count = null, ?Collection $states = null, ?Collection $has = null, ?Collection $for = null, ?Collection $afterMaking = null, ?Collection $afterCreating = null, $connection = null, ?Collection $recycle = null)
    {
        parent::__construct($count, $states, $has, $for, $afterMaking, $afterCreating, $connection, $recycle);
        $this->cabins = Cabin::pluck('id')->toArray();
        $this->guests = Guest::pluck('id')->toArray();
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdDate = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $startDate=  Carbon::instance($createdDate)->addDays($this->faker->numberBetween(1, 14));
        $endDate = Carbon::instance($startDate)->addDays($this->faker->numberBetween(1, 14));



        return [
            'created_at' =>fake()->randomElement([now(),$createdDate]),
            'start_date' => fake()->randomElement([now(),$startDate]),
            'end_date' => fake()->randomElement([now(),$endDate]),
            'cabin_id' => fake()->randomElement($this->cabins),
            'guest_id' => fake()->randomElement($this->guests),
            'has_breakfast' => $this->faker->boolean(),
            'observations' => $this->faker->optional()->sentence(),
            'is_paid' => $this->faker->boolean(),
            'num_guests' => $this->faker->numberBetween(1, 10),
            'num_nights' => $endDate->diffInDays($startDate),
            'cabin_price' => $this->faker->randomFloat(2, 50, 300), // Price per night
            'extras_price' => $this->faker->randomFloat(2, 0, 100),
            'total_price' => function (array $attributes) {
                return ($attributes['num_nights'] * $attributes['cabin_price']) + $attributes['extras_price'];
            },
            'status' => $this->faker->randomElement(['checked-in', 'checked-out', 'unconfirmed']),
        ];
    }
}
