import { NextResponse, type NextRequest } from "next/server";
import { menuItems } from "@/data/menuItems";
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  let data = menuItems;

  if (search) {
    data = data.filter((item) =>
      item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
  }
  if (category) {
    data = data.filter((item) => item.category === category);
  }

  return NextResponse.json(data);
}
