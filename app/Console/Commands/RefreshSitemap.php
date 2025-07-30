<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Forum;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class RefreshSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:refresh-sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate and cache the sitemap';
    public function __construct()
    {
        parent::__construct();
    }
    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Buat objek sitemap
        $sitemap = Sitemap::create()
            ->add(Url::create('/')->setPriority(1.0))
            ->add(Url::create('/acak'))
            ->add(Url::create('/register'))
            ->add(Url::create('/jadwal'))
            ->add(Url::create('/tugas'))
            ->add(Url::create('/forum'))
            ->add(Url::create('/chatboxai'));

        // Ambil semua forum dinamis dan tambahkan ke sitemap
        $forums = Forum::all();
        foreach ($forums as $forum) {
            $sitemap->add(
                Url::create("/forum/{$forum->slug}")
                    ->setLastModificationDate(Carbon::parse($forum->updated_at))
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.8)
            );
        }

        // Simpan sitemap ke dalam cache selama 24 jam
        Cache::put('sitemap', $sitemap, now()->addDay());
        $this->info('Sitemap has been refreshed.');
    }
}
