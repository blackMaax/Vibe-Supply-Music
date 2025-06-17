import { 
  getHomepageData, 
  getSiteSettings, 
  getContactSectionData, 
  getAboutPageDataOptimized,
  getPackagePageData 
} from '@/lib/queries'

export default async function DebugPage() {
  const fetchTime = new Date().toISOString()
  
  // Fetch all the main data sources
  const [
    homepageData,
    siteSettings,
    contactData,
    aboutData,
    packageData
  ] = await Promise.all([
    getHomepageData(),
    getSiteSettings(),
    getContactSectionData(),
    getAboutPageDataOptimized(),
    getPackagePageData()
  ])

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sanity Data Debug</h1>
      <p className="text-lg mb-8 bg-blue-100 p-4 rounded">
        Data fetched at: <strong>{fetchTime}</strong>
        <br />
        Refresh this page to see if data updates in real-time
      </p>
      
      <div className="space-y-8">
        {/* Site Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Site Settings</h2>
          <pre className="text-sm overflow-auto bg-gray-50 p-4 rounded">
            {JSON.stringify(siteSettings, null, 2)}
          </pre>
        </div>

        {/* Homepage Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-green-600">Homepage Data</h2>
          <pre className="text-sm overflow-auto bg-gray-50 p-4 rounded">
            {JSON.stringify(homepageData, null, 2)}
          </pre>
        </div>

        {/* Contact Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-purple-600">Contact Section Data</h2>
          <pre className="text-sm overflow-auto bg-gray-50 p-4 rounded">
            {JSON.stringify(contactData, null, 2)}
          </pre>
        </div>

        {/* About Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-orange-600">About Page Data</h2>
          <pre className="text-sm overflow-auto bg-gray-50 p-4 rounded">
            {JSON.stringify(aboutData, null, 2)}
          </pre>
        </div>

        {/* Package Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-red-600">Package Page Data</h2>
          <pre className="text-sm overflow-auto bg-gray-50 p-4 rounded">
            {JSON.stringify(packageData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
} 