import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";

const formSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters").max(100),
  contact_email: z.string().email("Please enter a valid email address").max(255),
  contact_phone: z.string().min(5, "Phone number is too short").max(20).optional(),
  website: z.string().url("Please enter a valid website URL").max(255).optional().or(z.literal("")),
  commission_rate: z.number().min(0, "Commission rate cannot be negative").max(50, "Commission rate cannot exceed 50%").default(10),
});

const BusinessPartner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: "",
      contact_email: "",
      contact_phone: "",
      website: "",
      commission_rate: 10,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const insertData = {
        business_name: values.business_name,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone || null,
        website: values.website || null,
        commission_rate: values.commission_rate,
      };

      const { error } = await supabase
        .from('business_partners')
        .insert([insertData]);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      form.reset();
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Become a Partner</h1>
            <p className="text-lg text-muted-foreground">
              Join our network of tour operators and reach Spanish language learners worldwide
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Partner Application</CardTitle>
              <CardDescription>
                Fill out this form to apply as a business partner. We'll review your application and contact you with the next steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Tour Company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@yourcompany.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://yourcompany.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="commission_rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proposed Commission Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="50"
                            step="0.5"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          What percentage commission are you willing to offer? (Default: 10%)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">What happens next?</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• We'll review your application within 2-3 business days</li>
                      <li>• Once approved, you'll receive instructions on how to add your tour listings</li>
                      <li>• Your tours will be visible to learners exploring Spanish-speaking locations</li>
                      <li>• We'll track bookings and handle commission payments monthly</li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessPartner;
