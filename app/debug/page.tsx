import { 
  getHomepageData, 
  getSiteSettings, 
  getContactSectionData, 
  getAboutPageDataOptimized,
  getPackagePageData 
} from '@/lib/queries'

// Direct Sanity API test
async function testSanityDirectly() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-17'
  
  // Test URL - direct to Sanity API
  const testUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=*[_type == "packageSection"][0]{packages[]{name,price}}`
  
  try {
    const response = await fetch(testUrl)
    const data = await response.json()
    return {
      url: testUrl,
      status: response.status,
      data: data
    }
  } catch (error) {
    return {
      url: testUrl,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

export default async function DebugPage() {
  const fetchTime = new Date().toISOString()
  
  // Test direct Sanity API
  const directTest = await testSanityDirectly()
  
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

      {/* Direct Sanity API Test */}
      <div className="bg-red-100 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-red-600">🔥 DIRECT SANITY API TEST</h2>
        <p className="mb-4"><strong>This bypasses ALL our code and queries Sanity directly:</strong></p>
        <pre className="text-sm overflow-auto bg-white p-4 rounded border">
          {JSON.stringify(directTest, null, 2)}
        </pre>
      </div>

      {/* Environment Check */}
      <div className="bg-yellow-100 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-yellow-600">🔧 ENVIRONMENT CHECK</h2>
        <pre className="text-sm overflow-auto bg-white p-4 rounded border">
          {JSON.stringify({
            NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
            NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
            NODE_ENV: process.env.NODE_ENV
          }, null, 2)}
        </pre>
      </div>
      
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