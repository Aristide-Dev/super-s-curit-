<?php

namespace App\Policies;

use App\Models\SecurityAgentApplication;
use App\Models\User;

class SecurityAgentApplicationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    public function view(User $user, SecurityAgentApplication $securityAgentApplication): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, SecurityAgentApplication $securityAgentApplication): bool
    {
        return $user->isAdmin();
    }
}
