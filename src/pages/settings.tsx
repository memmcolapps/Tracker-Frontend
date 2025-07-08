import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const settingsCategories = [
  { id: 'general', name: 'General', active: true },
  { id: 'security', name: 'Security', active: false },
  { id: 'integrations', name: 'Integrations', active: false },
  { id: 'notifications', name: 'Notifications', active: false },
  { id: 'ui', name: 'User Interface', active: false },
];

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState('general');

  const renderGeneralSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="systemName">System Name</Label>
          <Input id="systemName" defaultValue="Admin Platform" />
        </div>
        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Select defaultValue="utc-5">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
              <SelectItem value="utc-8">UTC-8 (Pacific Time)</SelectItem>
              <SelectItem value="utc-0">UTC+0 (Greenwich Time)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  const renderSecuritySettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
          <Input id="sessionTimeout" type="number" defaultValue="30" />
        </div>
        <div>
          <Label>Password Policy</Label>
          <div className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="uppercase" defaultChecked />
              <Label htmlFor="uppercase" className="text-sm">
                Require uppercase letters
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="numbers" defaultChecked />
              <Label htmlFor="numbers" className="text-sm">
                Require numbers
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="special" />
              <Label htmlFor="special" className="text-sm">
                Require special characters
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Integration settings will be available soon.</p>
            </CardContent>
          </Card>
        );
      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Notification settings will be available soon.</p>
            </CardContent>
          </Card>
        );
      case 'ui':
        return (
          <Card>
            <CardHeader>
              <CardTitle>User Interface Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">UI settings will be available soon.</p>
            </CardContent>
          </Card>
        );
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
        <div className="flex items-center space-x-3">
          <Button variant="secondary">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {settingsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderSettingsContent()}
        </div>
      </div>
    </div>
  );
}
