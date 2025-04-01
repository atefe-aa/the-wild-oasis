<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cabin>
 */
class CabinFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->word,
            'description'=>fake()->paragraph,
            'max_capacity'=>random_int(1,10),
            'regular_price'=>random_int(100,9999),
            'discount'=>random_int(0,50),
            'image'=>asset('/cabins/cabin-00'.random_int(1,8).'.jpg'),
            'status'=>fake()->randomElement([0,1]),
        ];
    }
}
