<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Emp extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'emp';
    protected $fillable = ['id', 'password', 'remember_token',
                            'email', 'email_verified_at',
                            'empno', 'ename', 'job', 'mgr', 'hiredate', 'sal', 'comm', 'deptno',
                            'img1', 'img2', 'role',
                            'post_code', 'address1', 'address2', 'phone_number'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // 自動増分ではない
    public $incrementing = false;

    // 主キーが数値型ではない
    protected $keyType = 'string';
    
    public function role() {
        return $this->belongsTo('App\Models\Role', 'role', 'id');
    }
}
