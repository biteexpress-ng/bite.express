import { api, type ApiResult } from "./api-client";
import { cities } from "./cities";
import type {
  AgentFormValues,
  RiderFormValues,
  VendorFormValues,
} from "./forms/schemas";

/**
 * Typed wrappers for the public partner-leads endpoints on the
 * Laravel backend (Phase 3c). These convert our internal camelCase
 * form values to the snake_case payload the backend validator
 * expects, and look up the city state from the slug for richer
 * admin display.
 *
 * Endpoints:
 *   POST /api/v1/leads/vendor
 *   POST /api/v1/leads/rider
 *   POST /api/v1/leads/agent
 *
 * Response contract (all three):
 *   201 → { ok: true, id: <number> }
 *   422 → { errors: { <field>: [<message>] } }
 *
 * Network / server errors are surfaced via the standard
 * api-client ApiResult discriminated union; consumers (the server
 * actions) decide whether to block the user or proceed to Mailgun.
 */

export type PartnerLeadOk = { ok: true; id?: number };

function stateOf(slug: string | undefined): string | null {
  if (!slug) return null;
  return cities.find((c) => c.slug === slug)?.state ?? null;
}

export async function submitVendorLead(
  values: VendorFormValues,
): Promise<ApiResult<PartnerLeadOk>> {
  return api<PartnerLeadOk>("/api/v1/leads/vendor", {
    method: "POST",
    body: {
      business_name: values.businessName,
      contact_name: values.contactName,
      email: values.email,
      phone: values.phone,
      city: values.city,
      city_state: stateOf(values.city),
      vendor_type: values.vendorType,
      number_of_locations: values.numberOfLocations,
      message: values.message || null,
    },
  });
}

export async function submitRiderLead(
  values: RiderFormValues,
): Promise<ApiResult<PartnerLeadOk>> {
  return api<PartnerLeadOk>("/api/v1/leads/rider", {
    method: "POST",
    body: {
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      city: values.city,
      city_state: stateOf(values.city),
      vehicle_type: values.vehicleType,
      availability: values.availability,
      has_smartphone: values.hasSmartphone,
    },
  });
}

export async function submitAgentLead(
  values: AgentFormValues,
): Promise<ApiResult<PartnerLeadOk>> {
  return api<PartnerLeadOk>("/api/v1/leads/agent", {
    method: "POST",
    body: {
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      city: values.city,
      city_state: stateOf(values.city),
      network: values.network,
    },
  });
}
