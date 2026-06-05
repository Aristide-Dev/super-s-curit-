import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    Clock,
    Edit2,
    Eye,
    LayoutList,
    Newspaper,
    Plus,
    Search,
    Star,
    Trash2,
    User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { cn } from '@/lib/utils';
import { create, destroy, edit, index } from '@/routes/articles';

type UserRef = { id: number; name: string } | null;

type ArticleRow = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    image_url: string | null;
    category: string | null;
    featured: boolean;
    views: number;
    read_time: number;
    status: string;
    status_label: string;
    created_by: UserRef;
    approved_by: UserRef;
    rejected_by: UserRef;
    created_at_formatted: string | null;
    submitted_at_formatted: string | null;
    approved_at_formatted: string | null;
    rejected_at_formatted: string | null;
    published_at_formatted: string | null;
};

type StatusOption = { value: string; label: string };

type PaginatedArticles = {
    data: ArticleRow[];
    current_page: number;
    last_page: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

type ArticleTab = 'all' | 'pending';

type PageProps = {
    articles: PaginatedArticles;
    filters: {
        search?: string;
        category?: string;
        status?: string;
        tab?: ArticleTab;
    };
    tab: ArticleTab;
    pendingCount: number;
    categories: string[];
    statuses: StatusOption[];
};

const tabs: { value: ArticleTab; label: string; icon: typeof LayoutList }[] = [
    { value: 'all', label: 'Tous les articles', icon: LayoutList },
    { value: 'pending', label: 'En attente de validation', icon: Clock },
];

function statusBadgeVariant(
    status: string,
): 'default' | 'secondary' | 'outline' | 'destructive' {
    if (status === 'published') {
        return 'default';
    }
    if (status === 'pending_approval') {
        return 'secondary';
    }
    if (status === 'rejected') {
        return 'destructive';
    }
    return 'outline';
}

export default function ArticlesIndex() {
    const { articles, filters, tab, pendingCount, categories, statuses } =
        usePage<PageProps>().props;

    const applyFilters = (updates: Record<string, string | undefined>) => {
        const next = { ...filters, ...updates };

        Object.keys(next).forEach((key) => {
            if (next[key as keyof typeof next] === undefined) {
                delete next[key as keyof typeof next];
            }
        });

        router.get(index.url(), next, { preserveState: true, replace: true });
    };

    const debouncedSearch = useDebouncedCallback((search: string) => {
        applyFilters({ search: search || undefined });
    });

    const switchTab = (nextTab: ArticleTab) => {
        if (nextTab === 'pending') {
            applyFilters({ tab: nextTab, status: undefined });
            return;
        }

        applyFilters({ tab: nextTab });
    };

    const handleDelete = (article: ArticleRow) => {
        if (
            !window.confirm(
                `Archiver l'actualité « ${article.title} » ? Elle ne sera plus visible publiquement.`,
            )
        ) {
            return;
        }

        router.delete(destroy.url(article.id));
    };

    return (
        <>
            <Head title="Actualités" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="font-heading flex items-center gap-2 text-2xl font-semibold tracking-tight">
                            <Newspaper className="size-6" aria-hidden />
                            Actualités
                            {pendingCount > 0 ? (
                                <Badge variant="destructive" className="text-xs">
                                    {pendingCount} en attente
                                </Badge>
                            ) : null}
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Gérez, validez et publiez les articles du site.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create.url()}>
                            <Plus className="size-4" aria-hidden />
                            Nouvelle actualité
                        </Link>
                    </Button>
                </div>

                <div className="inline-flex w-fit gap-1 rounded-lg bg-muted p-1">
                    {tabs.map(({ value, label, icon: Icon }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => switchTab(value)}
                            className={cn(
                                'flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                                tab === value
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
                            )}
                        >
                            <Icon className="size-4" aria-hidden />
                            {label}
                            {value === 'pending' && pendingCount > 0 ? (
                                <Badge
                                    variant={
                                        tab === 'pending'
                                            ? 'destructive'
                                            : 'secondary'
                                    }
                                    className="size-5 justify-center rounded-full px-0 text-[10px]"
                                >
                                    {pendingCount > 9 ? '9+' : pendingCount}
                                </Badge>
                            ) : null}
                        </button>
                    ))}
                </div>

                <div
                    className={cn(
                        'app-panel grid gap-4 p-4',
                        tab === 'all' ? 'md:grid-cols-4' : 'md:grid-cols-3',
                    )}
                >
                    <div className="relative md:col-span-2">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                            className="pl-9"
                            placeholder="Rechercher par titre..."
                            defaultValue={filters.search ?? ''}
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="border-input bg-background h-9 rounded-md border px-3 text-sm"
                        defaultValue={filters.category ?? 'all'}
                        onChange={(e) =>
                            applyFilters({ category: e.target.value })
                        }
                    >
                        <option value="all">Toutes les catégories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {tab === 'all' ? (
                        <select
                            className="border-input bg-background h-9 rounded-md border px-3 text-sm"
                            defaultValue={filters.status ?? 'all'}
                            onChange={(e) =>
                                applyFilters({ status: e.target.value })
                            }
                        >
                            <option value="all">Tous les statuts</option>
                            {statuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    ) : null}
                </div>

                {tab === 'pending' && pendingCount === 0 ? (
                    <div className="app-panel p-8 text-center">
                        <CheckCircle2 className="text-muted-foreground mx-auto size-10" />
                        <p className="mt-3 font-medium">
                            Aucun article en attente de validation
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Tous les articles ont été traités.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {articles.data.map((article) => (
                            <article
                                key={article.id}
                                className="app-panel overflow-hidden"
                            >
                                {article.image_url ? (
                                    <img
                                        src={article.image_url}
                                        alt={article.title}
                                        className="h-44 w-full object-cover"
                                    />
                                ) : (
                                    <div className="bg-muted flex h-44 items-center justify-center">
                                        <Newspaper className="text-muted-foreground size-10" />
                                    </div>
                                )}

                                <div className="space-y-3 p-5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge
                                            variant={statusBadgeVariant(
                                                article.status,
                                            )}
                                        >
                                            {article.status_label}
                                        </Badge>
                                        {article.category ? (
                                            <Badge variant="outline">
                                                {article.category}
                                            </Badge>
                                        ) : null}
                                        {article.featured ? (
                                            <Badge>
                                                <Star className="mr-1 size-3" />
                                                À la une
                                            </Badge>
                                        ) : null}
                                    </div>

                                    <h2 className="font-heading line-clamp-2 text-lg font-semibold">
                                        {article.title}
                                    </h2>

                                    {article.excerpt ? (
                                        <p className="text-muted-foreground line-clamp-2 text-sm">
                                            {article.excerpt}
                                        </p>
                                    ) : null}

                                    <div className="text-muted-foreground space-y-1.5 text-xs">
                                        {article.created_by ? (
                                            <p className="flex items-center gap-1">
                                                <User className="size-3.5" />
                                                Créé par{' '}
                                                {article.created_by.name}
                                                {article.created_at_formatted
                                                    ? ` — ${article.created_at_formatted}`
                                                    : ''}
                                            </p>
                                        ) : null}
                                        {article.submitted_at_formatted ? (
                                            <p className="flex items-center gap-1 text-amber-700">
                                                <Clock className="size-3.5" />
                                                Soumis le{' '}
                                                {
                                                    article.submitted_at_formatted
                                                }
                                            </p>
                                        ) : null}
                                        {article.approved_by ? (
                                            <p className="flex items-center gap-1 text-green-700">
                                                <CheckCircle2 className="size-3.5" />
                                                Validé par{' '}
                                                {article.approved_by.name}
                                                {article.approved_at_formatted
                                                    ? ` — ${article.approved_at_formatted}`
                                                    : ''}
                                            </p>
                                        ) : null}
                                        {article.rejected_by ? (
                                            <p className="text-destructive">
                                                Refusé par{' '}
                                                {article.rejected_by.name}
                                                {article.rejected_at_formatted
                                                    ? ` — ${article.rejected_at_formatted}`
                                                    : ''}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="text-muted-foreground flex items-center gap-4 text-xs">
                                        <span className="flex items-center gap-1">
                                            <Eye className="size-3.5" />
                                            {article.views}
                                        </span>
                                        <span>{article.read_time} min</span>
                                        {article.published_at_formatted ? (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="size-3.5" />
                                                {article.published_at_formatted}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="flex justify-end gap-2 border-t pt-3">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link href={edit.url(article.id)}>
                                                <Edit2 className="size-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(article)
                                            }
                                        >
                                            <Trash2 className="size-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {tab === 'all' && articles.data.length === 0 ? (
                    <div className="app-panel p-8 text-center">
                        <p className="text-muted-foreground">
                            Aucune actualité trouvée.
                        </p>
                    </div>
                ) : null}

                {articles.last_page > 1 ? (
                    <div className="flex flex-wrap justify-center gap-2">
                        {articles.links.map((link, linkIndex) => (
                            <Button
                                key={linkIndex}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => {
                                    if (link.url) {
                                        router.get(link.url, {}, {
                                            preserveState: true,
                                        });
                                    }
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </>
    );
}

ArticlesIndex.layout = {
    breadcrumbs: [{ title: 'Actualités', href: index.url() }],
};
