import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const HomePage = () => {
  return (
    <div className="min-h-screen text-gray-900 flex flex-col">
      {/* Intro Section */}
      <section
        className="relative py-24 px-6 text-center text-white"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/previews/022/752/709/non_2x/tree-on-an-open-book-world-earth-day-generative-ai-free-photo.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-3xl mx-auto z-10">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight ">
          </h1>
          <p className="text-xl text-gray-200 mb-6">
            Join a community of book lovers. Explore new reads, track your progress, and share your insights with others.
          </p>
          <Button
            asChild
            className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 text-lg font-semibold"
          >
            <Link to="/sign-up">Join Now</Link>
          </Button>
        </div>
      </section>

      {/* Featured Section */}
      <section
        className="relative py-20 px-6 text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1950&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-6xl mx-auto z-10">
          <h2 className="text-3xl font-semibold mb-10 text-center">🔥 Trending Reads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Midnight Library",
                img: "https://casualeyes.com/wp-content/uploads/2021/09/Review-Midnight-Library-1024x768.jpg",
              },
              {
                title: "Atomic Habits",
                video: "https://www.youtube.com/embed/G2pFTDhaHaQ?autoplay=1&mute=1&loop=1&playlist=G2pFTDhaHaQ&controls=0&modestbranding=1",
              },
              {
                title: "The Book Thief",
                img: "https://thumbs.dreamstime.com/b/d-render-funny-cartoon-burglar-thief-reading-book-d-funny-cartoon-burglar-thief-reading-book-77366296.jpg",
              },
            ].map((book, index) => (
              <Card key={index} className="overflow-hidden bg-white text-gray-900">
                <div className="h-48 w-full">
                  {book.img ? (
                    <img
                      src={book.img}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <iframe
                      src={book.video}
                      className="h-full w-full object-cover"
                      title={book.title}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Dive into a powerful story that will captivate your imagination and challenge your perspective.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
     <section className="bg-gray-300 py-20 px-6">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-semibold mb-10">💬 What Readers Are Saying</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          name: "Liam Parker",
          text: "I love how easy it is to track my reading progress and discover new books.",
          img: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Sophia Reyes",
          text: "BookVerse has reignited my love for reading!",
          img: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Noah Kim",
          text: "Clean interface, awesome community, and a fantastic way to stay motivated.",
          img: "https://randomuser.me/api/portraits/men/85.jpg",
        },
      ].map((user, i) => (
        <Card key={i} className="p-6 flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.img}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <span className="font-semibold text-gray-800">{user.name}</span>
            </div>
            <p className="text-sm text-gray-700">"{user.text}"</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>



      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm pb-12">
          <div className="md:col-span-4 text-center">
            <h3 className="text-white text-3xl font-semibold mb-4">About BookVerse</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              BookVerse is your personalized reading companion — track your reads, share insights, and explore new favorites.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-xs">
          © {new Date().getFullYear()} BookVerse — All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
