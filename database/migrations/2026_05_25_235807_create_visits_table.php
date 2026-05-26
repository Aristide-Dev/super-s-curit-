<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        Schema::create('visits', function (Blueprint $table) use ($driver) {
            $table->id();
            $table->uuid('visitor_uuid')->index();
            $table->string('session_id', 64)->index();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('path', 2048);
            $table->string('url', 2048);
            $table->string('query_string', 2048)->nullable();
            $table->string('referrer', 2048)->nullable();
            $table->string('referrer_domain', 255)->nullable();
            $table->ipAddress('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->string('browser', 64)->nullable();
            $table->string('browser_version', 32)->nullable();
            $table->string('platform', 64)->nullable();
            $table->string('device', 16)->nullable();    // desktop | tablet | mobile | bot
            $table->string('country_code', 2)->nullable();
            $table->string('country', 64)->nullable();
            $table->unsignedSmallInteger('duration_seconds')->nullable();
            $table->boolean('is_bot')->default(false)->index();
            $table->boolean('is_bounce')->default(true);
            $table->timestamps();

            $table->index(['created_at', 'is_bot']);

            if ($driver === 'mysql') {
                $table->rawIndex('path(191), created_at', 'visits_path_created_at_index');
            } else {
                $table->index(['path', 'created_at']);
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
