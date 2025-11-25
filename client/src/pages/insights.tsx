import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function Insights() {
  const articles = [
    { id: 1, type: "News", title: "Greeny advises on major solar deal in Northern Cape", date: "Nov 12, 2024", summary: "We are proud to announce the successful financial close of the 100MW solar facility..." },
    { id: 2, type: "Article", title: "The Future of Green Bonds in Africa", date: "Oct 28, 2024", summary: "Analyzing the trends and opportunities in the burgeoning African green debt market..." },
    { id: 3, type: "Publication", title: "Q3 2024 Renewable Energy Market Report", date: "Oct 15, 2024", summary: "Our quarterly analysis of energy pricing, policy changes, and market dynamics..." },
    { id: 4, type: "News", title: "Greeny appoints new Head of ESG", date: "Sep 30, 2024", summary: "Welcoming Dr. Sarah Khumalo to lead our Environmental, Social, and Governance practice..." },
    { id: 5, type: "Article", title: "Water Security: The Next Investment Frontier", date: "Sep 12, 2024", summary: "Why water infrastructure presents a critical opportunity for impact investors..." },
    { id: 6, type: "Publication", title: "Annual Impact Report 2024", date: "Aug 20, 2024", summary: "Measuring the tangible environmental and social outcomes of our managed portfolios..." },
  ];

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
          <Button variant="default" className="rounded-full px-6">All</Button>
          <Button variant="outline" className="rounded-full px-6">Articles</Button>
          <Button variant="outline" className="rounded-full px-6">Publications</Button>
          <Button variant="outline" className="rounded-full px-6">News</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <Card key={item.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-none bg-white shadow-sm">
              <div className="h-48 bg-muted w-full animate-pulse" /> {/* Placeholder for article image */}
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{item.type}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {item.date}
                  </span>
                </div>
                <CardTitle className="text-xl text-primary line-clamp-2 hover:text-emerald-600 cursor-pointer transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {item.summary}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 text-emerald-600 font-semibold">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
