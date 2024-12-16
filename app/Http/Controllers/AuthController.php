<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Todo;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;



class AuthController extends Controller
{

    public function index()
    {
        $tasks = Todo::all();
        dd($tasks);
        return response()->json($tasks);
    }



    // Fetch a specific user by ID
    public function show($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }
    }

    // Register a new user
    public function signup(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name ?? 'Default Name',
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }



    // Login a user and generate a token
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'Could not create token'], 500);
        }

        return response()->json(['token' => $token], 200);
    }




    // Fetch the authenticated user
    public function me()
    {
        return response()->json(auth()->user(), 200);
    }

    // Handle invalid token errors
    public function tokenError()
    {
        return response()->json(['message' => 'Token is not valid'], 401);
    }
}
