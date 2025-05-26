import { Paperclip } from 'lucide-react';

export default function CreateNewTicketPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 w-full">
      <form>
        <label className="font-bold">Product Purchase ID</label><br/>
        <input 
        type="text" 
        className="border-2 border-gray-700 rounded-lg p-2 my-2 bg-white w-48"/><br/><br/>
        <label className="font-bold">Subject</label><br/>
        <input 
        type="text" 
        className="border-2 border-gray-700 rounded-lg p-2 my-2 bg-white w-72"/><br/><br/>
        <label className="font-bold">Description</label><br/>
        <textarea 
          className="border-2 border-gray-700 rounded-lg p-2 my-2 bg-white w-1/2 h-36 resize-none"
          rows="6"
        ></textarea><br/><br/>
        <label className="font-bold">Categories</label><br/>
        <select name="categories" id="categories" className="border-2 border-gray-700 rounded-lg p-2 my-2 bg-white">
            <option value={"technical-issues"}>Technical Issues</option>
            <option value={"billing-and-payments"}>Billing and Payments</option>
            <option value={"product-inquiries"}>Product Inquiries</option>
            <option value={"complaints-and-feedback"}>Complaints and Feedback</option>
            <option value={"account-management"}>Account Management</option>
            <option value={"policy-questions"}>Policy Questions</option>
        </select><br/><br/>
        <div className="flex items-center gap-2">
          <label className="font-bold">Attachments</label>
          <Paperclip className="w-5 h-5" />
        </div>
        <div className="relative">
          <input 
            type='file'
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-2 file:border-gray-700
              file:text-sm file:font-semibold
              file:bg-white file:text-gray-700
              hover:file:bg-gray-50
              file:cursor-pointer"
          />
        </div><br/>
        <button 
          type="submit" 
          className="rounded-lg p-2 my-2 bg-gradient-to-br from-white to-orange-300 hover:from-white hover:to-orange-400 w-24 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}