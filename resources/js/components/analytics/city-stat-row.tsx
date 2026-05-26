import CountryFlag from '@/components/analytics/country-flag';

type CityStatRowProps = {
    city: string;
    country_code: string;
    country: string;
    views: number;
    visitors: number;
    percentage: number;
};

function formatNumber(n: number): string {
    return n.toLocaleString('fr-FR');
}

export default function CityStatRow({
    city,
    country_code,
    country,
    views,
    visitors,
    percentage,
}: CityStatRowProps) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <CountryFlag code={country_code} className="h-4 w-6 shrink-0" />
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                        <span className="truncate font-medium">{city}</span>
                        <span className="text-muted-foreground ml-1 text-xs">
                            ({country})
                        </span>
                    </div>
                    <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                        {formatNumber(visitors)} visiteurs
                    </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                    <div className="bg-border h-1.5 flex-1 overflow-hidden rounded-full">
                        <div
                            className="bg-primary h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <span className="w-20 shrink-0 text-right text-xs tabular-nums">
                        {formatNumber(views)} ({percentage}%)
                    </span>
                </div>
            </div>
        </div>
    );
}
