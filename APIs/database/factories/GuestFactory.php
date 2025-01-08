<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guest>
 */
class GuestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $countryFlags =['https://flagcdn.com/pt.svg',
            'https://flagcdn.com/gb.svg',
            'https://flagcdn.com/fi.svg',
            'https://flagcdn.com/de.svg',
            'https://flagcdn.com/bo.svg',
            'https://flagcdn.com/us.svg',
            'https://flagcdn.com/gb.svg',
            'https://flagcdn.com/eg.svg',
            'https://flagcdn.com/es.svg',
            'https://flagcdn.com/cn.svg',
            'https://flagcdn.com/sd.svg',
            'https://flagcdn.com/br.svg',
            'https://flagcdn.com/mx.svg',
            'https://flagcdn.com/eg.svg',
            'https://flagcdn.com/us.svg',
            'https://flagcdn.com/pk.svg',
            'https://flagcdn.com/au.svg',
            'https://flagcdn.com/fr.svg',
            'https://flagcdn.com/in.svg',
            'https://flagcdn.com/kw.svg',
            'https://flagcdn.com/za.svg',
            'https://flagcdn.com/jp.svg',
            'https://flagcdn.com/sa.svg',
            'https://flagcdn.com/vn.svg',
            'https://flagcdn.com/kr.svg',
            'https://flagcdn.com/co.svg',
            'https://flagcdn.com/ca.svg',
            'https://flagcdn.com/ar.svg',
            'https://flagcdn.com/ng.svg',
            'https://flagcdn.com/tw.svg',];
        return [
            'full_name'=>fake()->name,
            'email'=>fake()->unique()->email,
            'nationality'=>fake()->word,
            'national_id'=>fake()->numberBetween(10000000, 99999999),
            'country_flag'=>fake()->randomElement($countryFlags),
            'avatar'=>fake()->imageUrl(),
        ];
    }
}
