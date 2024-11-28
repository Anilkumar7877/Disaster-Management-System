import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { name, age, gender, bloodType, phone, email } = await req.json();
    console.log("Request data:", { name, age, gender, bloodType, phone, email });
    const newDonation = await prisma.bloodDonation.create({
      data: {
        name,
        age: parseInt(age),
        gender,
        bloodType,
        phone,
        email,
      },
    });

    return new Response(JSON.stringify(newDonation), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating donation record:', error);
    return new Response(JSON.stringify({ error: 'Error creating donation record' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  try {
    const donations = await prisma.bloodDonation.findMany();

    return new Response(JSON.stringify({ success: true, data: donations }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
