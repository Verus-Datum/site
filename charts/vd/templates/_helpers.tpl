{{- define "vd.name" -}}
{{- default .Chart.Name .Values.nameOverride }}
{{- end }}

{{- define "vd.fullname" -}}
{{- printf "%s-%s" (include "vd.name" .) .Chart.AppVersion | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "vd.labels" -}}
app.kubernetes.io/name: {{ include "vd.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
