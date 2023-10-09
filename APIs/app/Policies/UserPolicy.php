<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
    public function update(User $user, User $profileUser)
    {
        // Check if the authenticated user is the same as the profile user
        return $user->id === $profileUser->id;
    }

}
