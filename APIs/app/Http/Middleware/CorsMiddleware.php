<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization');
        $response->headers->set('Access-Control-Allow-Credentials', 'true'); // Add this line

        return $response;
    }
}
