<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var User $user  */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password']
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
    public function login(LoginRequest $request)
    {

        try {
            // \Log::info("hi");

            $credentials = $request->validated();

            if (!Auth::attempt($credentials)) {
                return response([
                    'error' => 'The provided email or password is incorrect.'
                ]);
            }

            /** @var User $user */
            $user = Auth::user();
            $token = $user->createToken('main')->plainTextToken;
            $minutes = 7 * 24 * 60;

            $response = new \Illuminate\Http\Response([
                'data' => [
                    'user' => $user,
                    'token' => $token
                ]
            ]); // Replace 'Your response content' with your actual response
            $response->withCookie(Cookie::make('access_token', $token, $minutes)); // $minutes is the cookie duration in minutes
            return $response;
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }

    public function logout(Request $request)
    {

        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete;

        return response('', 204);
    }
}
