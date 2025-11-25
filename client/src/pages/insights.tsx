import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@shared/schema";

export default function Insights() {
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  if (isLoading) {
    return (
      <div className="pb-20">
        <div className="bg-secondary/50 py-20 mb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Thought leadership, news, and market analysis from our team of experts.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 text-center py-20">
          <p className="text-muted-foreground">Loading insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-secondary/50 py-20 mb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Thought leadership, news, and market analysis from our team of experts.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          <Button variant="default" className="rounded-full px-6" data-testid="filter-all">All</Button>
          <Button variant="outline" className="rounded-full px-6" data-testid="filter-articles">Articles</Button>
          <Button variant="outline" className="rounded-full px-6" data-testid="filter-publications">Publications</Button>
          <Button variant="outline" className="rounded-full px-6" data-testid="filter-news">News</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <Card key={item.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-none bg-white shadow-sm" data-testid={`article-card-${item.id}`}>
              <div className="h-48 bg-muted w-full animate-pulse" />
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider" data-testid={`article-type-${item.id}`}>{item.type}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1" data-testid={`article-date-${item.id}`}>
                    <Calendar className="h-3 w-3" /> {item.date}
                  </span>
                </div>
                <CardTitle className="text-xl text-primary line-clamp-2 hover:text-emerald-600 cursor-pointer transition-colors" data-testid={`article-title-${item.id}`}>
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm line-clamp-3" data-testid={`article-summary-${item.id}`}>
                  {item.summary}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 text-emerald-600 font-semibold" data-testid={`article-readmore-${item.id}`}>
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No articles found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
