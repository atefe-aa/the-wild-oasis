<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class UserController extends Controller
{
    const STORAGE_URL = 'http://127.0.0.1:8000/storage/avatars/';
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, $id)
    {

        $user = User::findOrFail($id);
        // Validate the request data
        $incomingData = $request->validated();
        // Handle avatar upload
        if (isset($incomingData['avatar'])) {
            try {
                $file_name = time() . "." . $incomingData['avatar']->extension();
                $incomingData['avatar']->storeAs('public/avatars', $file_name);
                $incomingData['avatar'] = self::STORAGE_URL . $file_name;
            } catch (Exception $e) {
                return response()->json(['error' => 'Error uploading avatar.'], 400);
            }
        }
    
        try {
            // Update user data
            $user->update($incomingData);
            
            // Return a JSON response with updated user data
            return new UserResource($user);
        } catch (QueryException $e) {
            return response(['error' => 'Error updating user data. Please check your inputs.'], 400);
        } catch (Exception $e) {
            return response(['error' => 'An error occurred while updating user data.'], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
