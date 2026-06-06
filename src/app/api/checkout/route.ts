import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {

  try{
    const body=await req.json();
    if(!body){
      return NextResponse.json({
        success:false,message:"invalid!!"
      },{
        status:400
      });

    }
  }
}
