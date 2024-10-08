<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\Stock;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();
        $dentist = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
        ]);

        $stockCategories = [
            'pieces' => [
                'Dental Mirror',
                'Dental Explorer',
                'Dental Burs',
            ],
            'boxes' => [
                'Disposable Gloves (Box of 100)',
                'Surgical Masks (Box of 50)',
                'Dental Anesthetic',
                'Dental X-ray Films',
                'Sterilization Pouches',
            ],
            'syringes' => [
                'Composite Resin',
            ],
            'packs' => [
                'Dental Floss',
                'Cotton Rolls',
                'Saliva Ejectors',
                'Dental Bibs',
            ],
            'jars' => [
                'Temporary Filling Material',
            ],
            'sets' => [
                'Impression Material',
            ],
        ];


        foreach ($stockCategories as $unit => $items) {
            foreach ($items as $item) {
                Stock::create([
                    'name' => $item,
                    'price' => 0,
                    'quantity' => 0,
                    'reorder_level' => 0,
                    'unit' => $unit,
                    'dentist_id' => $dentist->id,
                ]);
            }
        }

        return response()->json([
            'message' => 'User created successfully'
        ], 201);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'token' => $token,
                    'user' => $user
                ], 200);
            }
        }
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }

    public function userInfo(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ], 200);
    }

    public function updateUserInfo(Request $request)
    {
        $user = User::findOrFail($request->user()->id);
        $user->update($request->all());
        return response()->json([
            'message' => 'User updated successfully'
        ], 200);
    }
}
