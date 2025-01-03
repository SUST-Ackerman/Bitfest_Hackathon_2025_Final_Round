from django.contrib import admin

from documents.models import PDF, Doc


@admin.register(PDF)
class PDFAdmin(admin.ModelAdmin):
    pass


@admin.register(Doc)
class DocAdmin(admin.ModelAdmin):
    pass
