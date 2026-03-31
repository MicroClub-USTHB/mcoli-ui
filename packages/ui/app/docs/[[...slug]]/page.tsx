import * as React from "react";
import { notFound } from "next/navigation";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";

import { source } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx";
import { Metadata } from "next";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const slug = (await params).slug;

  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const slug = (await params).slug;

  // fetch post information
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  return {
    title: `Mcoli UI - ${page.data.title}`,
    description: page.data.description,
  };
}
