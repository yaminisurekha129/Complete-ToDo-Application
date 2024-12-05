<?php

return [

   

    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],

   

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

///include this

        'api' =>[
            'driver'=>'jwt',
            'provider' => 'users',
            

        ],
    ],

    
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

   
    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 120,
            'throttle' => 120,
        ],
    ],

   

    'password_timeout' => 10800,

];
