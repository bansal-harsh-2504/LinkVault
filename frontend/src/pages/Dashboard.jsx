import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaUpload,
  FaChartBar,
  FaTags,
  FaLink,
  FaFolderOpen,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center px-6 py-16 max-w-3xl">
        <span className="inline-flex items-center border border-orange-200 text-orange-700 bg-orange-50 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FaFolderOpen className="mr-2" />
          Link Organization Made Easy
        </span>

        <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
          Organize Smarter.
          <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Save. Categorize. Retrieve.
          </span>
        </h1>

        <p className="text-lg text-slate-600 mb-10">
          LinkVault helps you collect, categorize, and access important links in
          one secure place. Build your own folder system, add notes, and never
          lose a reference again.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/folders">
            <button className="cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-lg text-lg flex items-center shadow-md transition-all duration-300 group">
              <FaFolderOpen className="mr-2" />
              View My Vault
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
          <Link to="/add-link">
            <button className="cursor-pointer border border-orange-200 hover:bg-orange-50 bg-white px-8 py-4 rounded-lg text-lg flex items-center transition duration-300 group">
              <FaUpload className="mr-2" />
              Add New Link
            </button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="w-full max-w-6xl px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Everything you need to organize your links
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Simple tools to store, annotate, and navigate your digital
            resources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaLink className="h-8 w-8 text-white" />,
              title: "Link Management",
              text: "Save, tag, and annotate links to stay organized.",
              color: "from-orange-400 to-amber-500",
            },
            {
              icon: <FaTags className="h-8 w-8 text-white" />,
              title: "Smart Organization",
              text: "Use folders and tags to categorize links your way.",
              color: "from-blue-400 to-blue-500",
            },
            {
              icon: <FaChartBar className="h-8 w-8 text-white" />,
              title: "Quick Search",
              text: "Find links instantly by title, note, or folder.",
              color: "from-green-400 to-emerald-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 text-center shadow-lg rounded-lg bg-gradient-to-br from-white to-orange-50/30 backdrop-blur hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`h-16 w-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-6`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
